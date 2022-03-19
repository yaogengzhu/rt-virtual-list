#!/usr/bin/env sh

# 发生错误时终止
set -e

# git 
git add .
git commit -m 'deploy'

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:yaogengzhu/rt-virtual-list.git main:gh-pages
# https://github.com/yaogengzhu/rt-virtual-list

cd -