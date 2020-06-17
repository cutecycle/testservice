
testservice
--------------


# Basics


## Start it up!

```
docker-compose up
```

It may take a few exponential backoff-restarts for the HTTP service to access the `mysql` container.


## Listing Customers and their Certificates
```
POST /customers
{
    "name": "name",
    "email": "email@site.com",
    "password": "helloworld"
}
```
Passwords are `bcrypt` hashed before storage and hashes are not returned via API. 

## Creating Certificates
```
POST /customers/:id/certificates
{
    "publicKey": "209jf09jq09ajwf209fjaweifjaw",
    "privateKey": "f2039jf2390fj209fj209fj",
    "active": true
}

```
private keys will never be returned

## Deactivating Certificates
```
PATCH /certificates/:id
{
    "active": false
}
```
This will send a `POST` to the httpbin defined in the environment variable `HTTPBIN`. 

## Persistence
The MySQL datastore is persisted to the Docker volume `sqldata`.

## 
# Deployment
## docker-compose
1. `docker-compose up `

# Kubernetes (microk8s, WIP)
1. docker push localhost:5000/testservice
2. kubectl apply -f deployment.yaml