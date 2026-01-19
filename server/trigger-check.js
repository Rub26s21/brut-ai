
import { supabase, supabaseAdmin } from './src/config/supabase.js';
import { checkBirthdaysAndSend } from './src/scheduler/birthdayScheduler.js';

async function test() {
    console.log('🧪 Starting Birthday Scheduler Test...');

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env');
        return;
    }

    console.log('✅ Admin Key detected.');

    try {
        await checkBirthdaysAndSend();
        console.log('🏁 Test completed. Check terminal logs above for results.');
    } catch (error) {
        console.error('💥 Test failed:', error);
    }
}

test();
