INSERT INTO public.folder (id, name) VALUES (0, 'My folder');
INSERT INTO public.folder (id, name) VALUES (1, 'Folder2');
INSERT INTO public.todo (id, description, marked, folder_id) VALUES (0, 'Create backend', true, 0);
INSERT INTO public.todo (id, description, marked, folder_id) VALUES (1, 'Create frontend', true, 1);
INSERT INTO public.todo (id, description, marked, folder_id) VALUES (2, 'Submit', false, 0);