```sh
# init
curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore --output .gitignore
npm init

# install
npm install yo generator-web-extension
mkdir swaggerConverter && cd $_
npx yo web-extension

# TypeScript
npm i -D typescript
npx tsc --init
```
