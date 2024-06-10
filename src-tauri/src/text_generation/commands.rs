use super::helpers::generate_text_for_chat;
// use crate::ai::AITools;
// use crate::chat::api_types::{APIChatContextNode, APIChatReply, APIChatThread};
use crate::error::DwataError;
use crate::workspace::crud::InsertUpdateResponse;
use crate::workspace::DwataDb;
use tauri::State;

#[tauri::command]
pub async fn chat_with_ai(
    chat_id: i64,
    db: State<'_, DwataDb>,
) -> Result<InsertUpdateResponse, DwataError> {
    let mut db_guard = db.lock().await;
    generate_text_for_chat(chat_id, &mut db_guard).await
}

// #[tauri::command]
// pub(crate) async fn fetch_chat_context_node_list(
//     node_path: Vec<String>,
//     store: State<'_, Store>,
// ) -> Result<Vec<APIChatContextNode>, DwataError> {
//     let config_guard = store.config.lock().await;
//     Ok(config_guard.get_next_chat_context_node_list(&node_path[..]))
// }

// #[tauri::command]
// pub(crate) async fn fetch_chat_context(
//     node_path: Vec<String>,
//     store: State<'_, Store>,
// ) -> Result<String, DwataError> {
//     let config_guard = store.config.lock().await;
//     config_guard.get_chat_context(&node_path[..]).await
// }
