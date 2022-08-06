# qr-find

## Environment
### Get Started
```sh
cd client
npm start
```

### Technology under consideration
#### React
- [ ] emotion
- [ ] tailwind css
- [ ] MUI
- [ ] ESLint
- [ ] Prettier

https://zenn.dev/nakashi94/articles/f67fa9b54437da


#### AWS
- [ ] micro service archtecture
<!-- - [x] test -->

##### service
- [ ] EC2 (t2.micro or t3.micro)
- [ ] S3
- [ ] Amazon Email service
- [ ] Amazon RDS (My SQL or PostgreSQL)
- [ ] Lambda
- [ ] Amazon Elastic Block Store(EBS)

##### API
- Database
    - `create` : param[`mail`] : store[`data`,`mail`,`id`] : return[`id`]
    - `get` : param[`id`] : send email

- SES
    - `send` : send email
