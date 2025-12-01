import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TestUser {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'kunde' | 'installateur' | 'kundenbetreuer'
}

const testUsers: TestUser[] = [
  {
    email: 'mueller@test.de',
    password: 'test123',
    firstName: 'Anna',
    lastName: 'Müller',
    role: 'kunde'
  },
  {
    email: 'schmidt@test.de',
    password: 'test123',
    firstName: 'Thomas',
    lastName: 'Schmidt',
    role: 'installateur'
  },
  {
    email: 'weber@test.de',
    password: 'test123',
    firstName: 'Sarah',
    lastName: 'Weber',
    role: 'kundenbetreuer'
  }
]

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const results = []

    for (const user of testUsers) {
      // Versuche bestehenden User zu löschen
      try {
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
        const existingUser = existingUsers?.users?.find(u => u.email === user.email)
        
        if (existingUser) {
          await supabaseAdmin.auth.admin.deleteUser(existingUser.id)
          results.push({ email: user.email, action: 'deleted_existing' })
        }
      } catch (error) {
        console.log(`Kein existierender User gefunden für ${user.email}`)
      }

      // Erstelle neuen User
      const { data: newUser, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          first_name: user.firstName,
          last_name: user.lastName,
          role: user.role
        }
      })

      if (signUpError) {
        results.push({ 
          email: user.email, 
          action: 'error', 
          error: signUpError.message 
        })
        continue
      }

      results.push({ 
        email: user.email, 
        action: 'created',
        userId: newUser.user?.id,
        role: user.role
      })
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Test-User erfolgreich eingerichtet',
        results 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Fehler beim Einrichten der Test-User:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
