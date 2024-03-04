import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qdvtgrjggloztjbsdrjp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkdnRncmpnZ2xvenRqYnNkcmpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1MjI3MTEsImV4cCI6MjAyNTA5ODcxMX0.7Def3kk98neXejXYlaMZP-Lv2esIbnzwX4UnlwRdNRY'
export const supabase = createClient(supabaseUrl, supabaseKey)