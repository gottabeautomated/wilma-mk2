import { supabase } from './supabase';

export async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  if (!supabase) {
    console.log('❌ Supabase client is null (development mode)');
    return false;
  }

  try {
    // Test 1: Check if we can connect to Supabase
    const { data: testData, error: testError } = await supabase
      .from('weddings')
      .select('count')
      .limit(1);
      
    if (testError) {
      console.log('❌ Connection failed:', testError.message);
      return false;
    }

    console.log('✅ Database connection successful');

    // Test 2: Check if auth works
    const { data: authData, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.log('⚠️ Auth test failed (expected if not logged in):', authError.message);
    } else {
      console.log('✅ Auth system working, user:', authData.user?.email || 'not logged in');
    }

    // Test 3: Check weddings table structure
    const { data: schemaTest, error: schemaError } = await supabase
      .from('weddings')
      .select('id, user_id, wedding_date, venue_name')
      .limit(1);
      
    if (schemaError) {
      console.log('❌ Schema test failed:', schemaError.message);
      return false;
    }

    console.log('✅ Weddings table schema is correct');

    // Test 4: Check guests table structure  
    const { data: guestsSchema, error: guestsError } = await supabase
      .from('guests')
      .select('id, wedding_id, first_name, rsvp_status, plus_one')
      .limit(1);
      
    if (guestsError) {
      console.log('❌ Guests schema test failed:', guestsError.message);
      return false;
    }

    console.log('✅ Guests table schema is correct');
    console.log('🎉 All Supabase tests passed!');
    
    return true;
  } catch (error) {
    console.log('❌ Unexpected error:', error);
    return false;
  }
} 