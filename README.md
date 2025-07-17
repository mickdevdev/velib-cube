# JS Scaffold

Stack : Node 24 + Postgres 17 + TS

## Main commands

```bash
make install        # Build containers, start services
make up             # Start Docker containers
make down           # Stop Docker containers
make sh             # Open a shell inside the container
make test           # Run all tests
make lint           # Run static analysis and code style checks
make fix            # Run analysis & fix code style
```

###

First, import stations data from opendata : make import-stations
Update stations with PUT endpoint

Cube Dashboard : http://localhost:4000
PUT /stations : http://localhost:3000/stations
