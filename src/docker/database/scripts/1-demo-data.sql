INSERT INTO public.folder (id, name) VALUES (1, 'Folder');
INSERT INTO public.folder (id, name) VALUES (2, 'Folder2');
INSERT INTO public.todo (id, description, marked, folder_id) VALUES (3, 'Create backend', true, 1);
INSERT INTO public.todo (id, description, marked, folder_id) VALUES (4, 'Create frontend', true, 2);
INSERT INTO public.todo (id, description, marked, folder_id) VALUES (5, 'Submit', false, 1);