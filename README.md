#adminPro - Backend

iniciar el proyecto: npm run start:dev

subir proyecto a git la primera vez

- crear el .gitignore para indicar lo que no queremos subir
- luego hacer git init
- escribimos git add . para preparar todos los archivos
- hacemos git commit -m "descripcion" y luego enter
- escribimos en la terminal los comandos que nos indica al crear el repositorio como:
  git remote add origin https://github.com/davidRomaan/backend-sistema-medico.git, git branch -M main y git push -u origin main

ver el link del proyecto en git

- git remote -v

obtener datos en el controlador:

- por headers: const token = req.header('x-token');
- cuando en la ruta tiene un parametro incluido por ejemplo: router.get('/:search', validateToken, searchAll) localhost:3000/api/all/david: lo recibimos asi: req.params.search
- cuando la ruta viene un param asi localhost:3000/api/users?from=0 lo recibimos con req.query.from
