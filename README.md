## Stretch Objective - Database Caching Strategy

We can access the data through a caching server, with Redis for example, we can implement read-through/write-behind database caching strategy. This strategy will load data into cache only if necessary, it will look for data in cache first and if present, returns the data, otherwise it will rtrieve the data form database, put into the cache and return. When writing to database, It will write to cache first and after a certain delay, it updates the database periodically. Advantages for such strategy are:

1. The application will always go to the cache to retrieve latest data and never the database to keep the database load to the minimum. It also means that application will not need to be responsible to populate the cache.
2. Good write performance, it lets the application quickly update the cache and return. Then let the cache update the database in the background with a specific set delay or time to reducing its load.
3. If cache were to expire OR the database were to be updated, read through allows cache to reload automatically, which means that the application will not need to hit the database in peak times and latest data is always in cache.


### Diagram of Read-Through
![Image of Read-Through](https://s3.amazonaws.com/bluzelle-craft-private-storage/3.png?mtime=20190401053315)

### Diagram of Write-Behind
![Image of Write-Behind](https://s3.amazonaws.com/bluzelle-craft-private-storage/5.png?mtime=20190401053317)
