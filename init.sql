-- *************** SqlDBM: PostgreSQL ****************;
-- ***************************************************;

CREATE TABLE USERS
(
 user_id  serial NOT NULL,
 username varchar(50) NOT NULL,
 password varchar(50) NOT NULL,
 email    varchar(50) NOT NULL,
 name     varchar(50) NOT NULL,
 CONSTRAINT PK_users PRIMARY KEY ( user_id )
);

CREATE TABLE APPLIED_TO
(
 application_id  serial NOT NULL,
 company_name    varchar(50) NOT NULL,
 last_updated    date NOT NULL,
 stage           varchar(50) NOT NULL,
 resume          bytea NOT NULL,
 user_id         integer NOT NULL,
 recruiter       varchar(50) NULL,
 recruiter_email varchar(50) NULL,
 CONSTRAINT PK_table_10 PRIMARY KEY ( application_id ),
 CONSTRAINT FK_48 FOREIGN KEY ( user_id ) REFERENCES USERS ( user_id )
);

CREATE INDEX fkIdx_48 ON APPLIED_TO
(
 user_id
);

CREATE TABLE COMMENTS
(
 comment_id     serial NOT NULL,
 application_id integer NOT NULL,
 comment        varchar(500) NOT NULL,
 CONSTRAINT PK_comments PRIMARY KEY ( comment_id ),
 CONSTRAINT FK_55 FOREIGN KEY ( application_id ) REFERENCES APPLIED_TO ( application_id )
);

CREATE INDEX fkIdx_55 ON COMMENTS
(
 application_id
);