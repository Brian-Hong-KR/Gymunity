#sudo mysql
#create database gymunity DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
#create user gm identified by '1234';
#GRANT ALL PRIVILEGES ON gymunity.* TO 'gm'@'%'

mysql -u gm -p gymunity < gm_challenges.sql
mysql -u gm -p gymunity < gm_grades.sql
mysql -u gm -p gymunity < gm_members.sql
mysql -u gm -p gymunity < gm_point_add.sql
mysql -u gm -p gymunity < gm_point_adjust.sql
mysql -u gm -p gymunity < gm_point_aggr.sql
mysql -u gm -p gymunity < gm_point_subtract.sql
mysql -u gm -p gymunity < gm_profiles.sql
mysql -u gm -p gymunity < gm_pt_log.sql
mysql -u gm -p gymunity < gm_pt_qna.sql
mysql -u gm -p gymunity < gm_routines.sql
mysql -u gm -p gymunity < gm_survey.sql
mysql -u gm -p gymunity < gm_users.sql
mysql -u gm -p gymunity < gm_verify.sql




