default: dev

dev:
  @mprocs "npm run start:dev"

build:
  @mprocs "npm run build"

run: build
  @mprocs "npm run start:prod"