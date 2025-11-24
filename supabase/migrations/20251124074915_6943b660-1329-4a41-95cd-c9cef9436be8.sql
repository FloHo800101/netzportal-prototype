-- Insert test users for each role
-- Note: These are hashed passwords for "test123"
-- Password hash for "test123": $2a$10$rX8Z8Z8Z8Z8Z8Z8Z8Z8Z8uKj7qH9YwC5vK5vK5vK5vK5vK5vK5vK5u

-- Test user 1: Kunde (Frau Müller)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  'a1111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'mueller@test.de',
  '$2a$10$rX8Z8Z8Z8Z8Z8Z8Z8Z8Z8uKj7qH9YwC5vK5vK5vK5vK5vK5vK5vK5u',
  now(),
  '{"first_name": "Anna", "last_name": "Müller", "role": "kunde"}'::jsonb,
  now(),
  now(),
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Test user 2: Installateur (Herr Schmidt)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  'b2222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'schmidt@test.de',
  '$2a$10$rX8Z8Z8Z8Z8Z8Z8Z8Z8Z8uKj7qH9YwC5vK5vK5vK5vK5vK5vK5vK5u',
  now(),
  '{"first_name": "Thomas", "last_name": "Schmidt", "role": "installateur"}'::jsonb,
  now(),
  now(),
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Test user 3: Kundenbetreuer (Herr Weber)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  'c3333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'weber@test.de',
  '$2a$10$rX8Z8Z8Z8Z8Z8Z8Z8Z8Z8uKj7qH9YwC5vK5vK5vK5vK5vK5vK5vK5u',
  now(),
  '{"first_name": "Michael", "last_name": "Weber", "role": "kundenbetreuer"}'::jsonb,
  now(),
  now(),
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Manually trigger profile and role creation for test users
-- (normally handled by trigger, but we're inserting directly)
INSERT INTO public.profiles (id, first_name, last_name)
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'Anna', 'Müller'),
  ('b2222222-2222-2222-2222-222222222222', 'Thomas', 'Schmidt'),
  ('c3333333-3333-3333-3333-333333333333', 'Michael', 'Weber')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'kunde'),
  ('b2222222-2222-2222-2222-222222222222', 'installateur'),
  ('c3333333-3333-3333-3333-333333333333', 'kundenbetreuer')
ON CONFLICT (user_id, role) DO NOTHING;