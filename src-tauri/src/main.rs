// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;
use std::sync::Arc;
use tauri::Manager;
use tokio::sync::Mutex;

mod data_sources;
mod error;
// mod labels;
mod query_result;

// mod chat;
// mod saved_query;
mod schema;
mod store;
mod workspace;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            let config_dir: PathBuf = app.path().config_dir().unwrap();
            app.manage(store::Store {
                config: Arc::new(Mutex::new(workspace::helpers::load_config(&config_dir))),
            });
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            workspace::commands::read_config,
            // labels::commands::load_labels,
            schema::commands::read_schema,
            // query_result::commands::load_data,
            workspace::commands::create_data_source,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
