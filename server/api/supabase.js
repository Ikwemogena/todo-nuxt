// import { createClient } from '@supabase/supabase-js';

// const {supabaseUrl, supabaseKey} = useRuntimeConfig();

// // const supabaseUrl = 'https://fkvnvhdjidzlfhimwqpo.supabase.co';
// // const supabaseKey = 'YOUR_SUPABASE_KEY';

// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

import { createClient } from '@supabase/supabase-js';

const {supabaseUrl, supabaseKey} = useRuntimeConfig();

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
