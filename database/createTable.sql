CREATE TABLE "user" (
	"userId" serial NOT NULL,
	"userName" varchar(255) NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "route" (
	"routeId" serial NOT NULL,
	"name" varchar(255) DEFAULT 'Unnamed',
	"grade" varchar(255) NOT NULL,
	"userId" serial NOT NULL,
	"location" varchar(255) NOT NULL,
	"locationType" BOOLEAN NOT NULL,
	"attempts" int NOT NULL,
	"angle" int,
	"completed" DATE NOT NULL,
	"note" TEXT,
	"image" bytea,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "route_pk" PRIMARY KEY ("routeId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "route" ADD CONSTRAINT "route_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");
