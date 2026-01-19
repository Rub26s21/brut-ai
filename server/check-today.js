
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function check() {
    console.log('--- Database Check ---');
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    console.log(`Today is ${month}-${day}`);

    const { data: contacts, error } = await supabase
        .from('contacts')
        .select('*');

    if (error) {
        console.error('Error fetching contacts:', error);
        return;
    }

    console.log(`Found ${contacts.length} total contacts`);

    const matches = contacts.filter(contact => {
        const dob = new Date(contact.dob);
        const dobMonth = String(dob.getMonth() + 1).padStart(2, '0');
        const dobDay = String(dob.getDate()).padStart(2, '0');
        const isMatch = dobMonth === month && dobDay === day;
        console.log(`- ${contact.name}: DOB ${contact.dob} -> parsed: ${dobMonth}-${dobDay} match: ${isMatch}`);
        return isMatch;
    });

    console.log(`Matches: ${matches.length}`);

    console.log('\n--- Email Logs Check (Today) ---');
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { data: logs, error: logError } = await supabase
        .from('email_logs')
        .select('*')
        .gte('sent_at', todayStart.toISOString())
        .order('sent_at', { ascending: false });

    if (logError) {
        console.error('Error fetching logs:', logError);
    } else {
        console.log(`Found ${logs.length} logs for today`);
        logs.forEach(log => {
            console.log(`- ${log.contact_name} (${log.contact_email}): ${log.status} at ${log.sent_at}`);
            if (log.error_message) console.log(`  Error: ${log.error_message}`);
        });
    }
}

check();
