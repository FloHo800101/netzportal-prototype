-- Bereinige die fehlerhaften Test-User-Einträge
DELETE FROM public.user_roles WHERE user_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333'
);

DELETE FROM public.profiles WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333'
);

-- Hinweis: auth.users kann nicht direkt über Migrationen bereinigt werden
-- Die Benutzer müssen über die normale Signup-Seite erstellt werden