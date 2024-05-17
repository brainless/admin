use super::models::UserAccount;
use crate::relational_database::crud::CRUD;
use sqlx::{query_as, SqliteConnection};

impl CRUD for UserAccount {
    type Model = UserAccount;

    fn table_name() -> String {
        "user_account".to_string()
    }

    async fn select_one_by_pk(
        pk: i64,
        db_connection: &mut SqliteConnection,
    ) -> Result<UserAccount, sqlx::Error> {
        query_as("SELECT * FROM user_account WHERE id = ?1")
            .bind(pk)
            .fetch_one(db_connection)
            .await
    }
}
