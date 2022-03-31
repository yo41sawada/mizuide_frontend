# spring-petclinic

spring-petclinicのSPA化を行ったフロントエンド
### 環境
OSはどれでも問題ないと思います。
windowsの場合は、各コマンドはpowershellで実行するようにしてください。

### 必要ソフトウェア
dockerをインストールしている必要があります、

### 前準備
本プロジェクトのルートディレクトリで以下のコマンドを実行して、ビルドに使用するdockerイメージを作成する
```shell
docker build -t react/petclinic:1.0 .
```
### 動作確認
初回
```shell
docker run --name petclinic-front -p 3000:3000 -it -v /$(pwd)/petclinic:/workspaces/petclinic react/petclinic:1.0 /bin/ash
/bin/ash -c 'cd /workspaces/petclinic;yarn start'
exit
```

2回目以降
```shell
docker start petclinic-front
docker exec -it petclinic-front /bin/bash -c 'cd /workspaces/petclinic;yarn start'
```
localhost:3000に接続すると、アプリケーションにアクセスすることができる。
(バックエンドの起動に関してはback側のREADMEを参照のこと)

### ビルド
初回
```shell
docker run --name petclinic-front -p 3000:3000 -it -v /$(pwd)/petclinic:/workspaces/petclinic react/petclinic:1.0 /bin/ash
/bin/ash -c 'cd /workspaces/petclinic;yarn build'
exit
```

2回目以降
```shell
docker start petclinic-front
docker exec -it petclinic-front /bin/bash -c 'cd /workspaces/petclinic;yarn build'
```
ビルドの成果物はpetclinc/buildに作成される。

