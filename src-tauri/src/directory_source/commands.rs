use super::{DirectorySource, File};
use crate::content::containers::HeterogeneousContentArray;
use crate::error::DwataError;
use crate::workspace::crud::CRUDRead;
use crate::workspace::DwataDb;
use std::path::PathBuf;
use tauri::State;

#[tauri::command]
pub(crate) async fn fetch_file_list_in_directory(
    directory_id: i64,
    db: &Pool<Sqlite>,
) -> Result<Vec<File>, DwataError> {
    let mut db_guard = db.lock().await;
    // Find the Directory matching the given folder_id
    match DirectorySource::read_one_by_pk(directory_id, &mut db_guard).await {
        Ok(directory) => Ok(directory.get_file_list()),
        Err(x) => Err(x),
    }
}

#[tauri::command]
pub(crate) async fn fetch_file_content_list(
    directory_id: i64,
    relative_file_path: &str,
    db: &Pool<Sqlite>,
) -> Result<HeterogeneousContentArray, DwataError> {
    let mut db_guard = db.lock().await;
    // Find the Directory matching the given folder_id
    match DirectorySource::read_one_by_pk(directory_id, &mut db_guard).await {
        Ok(directory) => {
            // We assume we are reading Markdown files only
            // We parse Markdown file with comrak and extract headings and paragraphs only
            // Find the FolderSource matching the given folder_id
            let full_path: PathBuf = directory.path.join(relative_file_path);
            if full_path.exists() {
                Ok(DirectorySource::get_file_contents(&full_path))
            } else {
                Err(DwataError::CouldNotOpenDirectory)
            }
        }
        Err(x) => Err(x),
    }
}
