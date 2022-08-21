# iniciar o projeto
## Instale as dependendias do projeto no front e no back

```sh
npm i
```
### Suba um docker para rodar o banco de dados MySql
```sh
 docker run --name HGTX -e MYSQL_ROOT_PASSWORD=HGTX123 -p 3306:3306 -d mysql:5.7 
```
### Lembre de configurar o dotenv, deixei um arquivo de exemplo



#### Entre na pasta back-end e rode os comandos

```sh
npm run reset
npm run dev
```

#### Entre na pasta front-end e rode o comando npm start

```sh
npm start
```
