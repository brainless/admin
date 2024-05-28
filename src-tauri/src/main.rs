// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use crate::error::DwataError;
use env_logger;
use log::{error, info};
use sqlx::SqliteConnection;
use std::path::PathBuf;
use tauri::{App, Manager};

mod database_source;
mod directory_source;
mod error;
// mod labels;
mod chat;
mod relational_database;
// mod saved_query;
mod ai;
mod content;
// mod embedding;
// mod schema;
mod user_account;
mod workspace;

fn setup(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    env_logger::init();
    info!("Setting up Dwata");
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
        let window = app.get_webview_window("main").unwrap();
        window.open_devtools();
        window.close_devtools();
    }
    let app_config_dir: PathBuf = app.path().app_config_dir().unwrap();
    match tauri::async_runtime::block_on(async {
        workspace::helpers::get_database_connection(&app_config_dir).await
    }) {
        Ok(db_connection) => {
            app.manage(workspace::DwataDb::new(db_connection));
        }
        Err(err) => {
            error!("Could not connect to Dwata DB\n Error: {:?}", err);
            return Err(Box::new(DwataError::CouldNotConnectToDwataDB));
        }
    }
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(setup)
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            workspace::commands::get_module_configuration,
            workspace::commands::read_module_list,
            workspace::commands::read_module_item_by_pk,
            workspace::commands::insert_module_item,
            workspace::commands::update_module_item,
            workspace::commands::upsert_module_item,
            directory_source::commands::fetch_file_list_in_directory,
            directory_source::commands::fetch_file_content_list,
            // labels::commands::load_labels,
            // schema::commands::read_schema,
            // relational_database::commands::load_data,
            // workspace::commands::create_database_source,
            // workspace::commands::create_folder_source,
            // workspace::commands::create_ai_integration,
            // workspace::commands::update_ai_integration,
            // chat::commands::start_chat_thread,
            // chat::commands::fetch_chat_thread_list,
            // chat::commands::fetch_chat_thread_detail,
            // chat::commands::fetch_chat_reply_list,
            // chat::commands::fetch_chat_context_node_list,
            // chat::commands::fetch_chat_context,
            // embedding::commands::generate_text_embedding,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
