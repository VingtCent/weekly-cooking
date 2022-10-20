# Weekly Cooking
## Related documentation
* https://next.vuetifyjs.com/en/getting-started/installation/
* https://vuejs.org/guide/introduction.html
## Project Setup
```sh
npm install
```
### Compile and Hot-Reload for Development
```sh
npm run dev
```
### Type-Check, Compile and Minify for Production
```sh
npm run build
```
## Doker
### Build
```sh
docker build -t weekly-cooking .
```
### Run
```sh
docker run -it -p 8080:80 --rm --name weekly-cooking weekly-cooking
```