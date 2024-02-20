import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kcetwjofrupafewwnxck.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZXR3am9mcnVwYWZld3dueGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NTMwNjcsImV4cCI6MjAyMTIyOTA2N30.FzL_Y75j-y7VCeR0oXo2rYaUPlf_Yv71fKtlcAjgGSQ'
export const supabase = createClient(supabaseUrl, supabaseKey)