use crate::data_sources::helpers::check_database_connection;
use crate::data_sources::{DataSource, Database};
use crate::error::DwataError;
use crate::store::Store;
use crate::workspace::api_types::APIConfig;
use std::fs;
use tauri::State;

#[tauri::command]
pub async fn create_data_source(
    _database_type: Option<&str>,
    username: &str,
    password: Option<&str>,
    host: &str,
    port: Option<&str>,
    database: &str,
    store: State<'_, Store>,
) -> Result<String, DwataError> {
    match check_database_connection(username, password, host, port, database).await {
        Ok(_) => {
            let database: Database = Database::new(username, password, host, port, database);
            let data_source: DataSource = DataSource::new_database(database, None);
            let id = data_source.get_id().clone();
            let mut guard = store.config.lock().await;
            guard.data_source_list.push(data_source);
            match fs::write(&guard.path_to_config, guard.get_pretty_string()) {
                Ok(_) => Ok(id.clone()),
                Err(_) => Err(DwataError::CouldNotWriteConfig),
            }
        }
        Err(e) => Err(e),
    }
}

#[tauri::command]
pub async fn read_config(store: State<'_, Store>) -> Result<APIConfig, DwataError> {
    let guard = store.config.lock().await;
    Ok(APIConfig::from_config(&guard))
}
