insert into "route" ("name", "grade", "userId", "location", "locationType", "attempts", "angle", "completed")
values ('route1', 2, 1, 'location1', true, 1, 20, '2020-02-16'),
       ('route2', 5, 1, 'location2', false, 2, 40, '2020-02-15'),
       ('route3', 13, 1, 'location3', false, 3, null, '2020-02-13'),
       ('route4', 9, 1, 'location2', false, 1, null, '2020-02-16'),
       ('route5', 0, 1, 'location3', true, 2, 30, '2020-02-14'),
       ('route6', 3, 1, 'location1', false, 2, 20, '2020-02-13'),
       ('route7', 11, 1, 'location3', true, 3, 50, '2020-02-15'),
       ('route8', 9, 1, 'location3', false, 2, 40, '2020-02-16'),
       ('route9', 0, 1, 'location2', false, 1, null, '2020-02-14'),
       ('route10', 4, 1, 'location2', true, 1, null, '2020-02-16'),
       ('route11', 3, 1, 'location5', true, 1, 30, '2020-02-16'),
       ('route12', 5, 1, 'location4', false, 4, null, '2020-02-12'),
       ('route13', 12, 1, 'location3', false, 3, null, '2020-02-15'),
       ('route14', 11, 1, 'location5', true, 2, 30, '2020-02-13'),
       ('route15', 1, 1, 'location1', true, 1, null, '2020-02-15'),
       ('route16', 15, 1, 'location3', true, 2, null, '2020-02-14'),
       ('route17', 6, 1, 'location2', false, 1, 30, '2020-02-14'),
       ('route18', 12, 1, 'location5', false, 1, 40, '2020-02-16'),
       ('route19', 10, 1, 'location3', false, 5, 50, '2020-02-14'),
       ('route20', 3, 1, 'location1', true, 3, null, '2020-02-16'),
       ('route21', 8, 1, 'location1', false, 1, 30, '2020-02-16'),
       ('route22', 3, 1, 'location3', true, 2, null, '2020-02-15')
returning *;
