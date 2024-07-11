use chrono::{DateTime, Utc};
use glob::glob;
use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow, types::Json};
use std::path::PathBuf;
use ts_rs::TS;

pub mod api;
pub mod commands;
pub mod crud;
pub mod file_contents;

#[derive(Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, rename_all = "camelCase")]
pub struct File {
    #[serde(skip_serializing)]
    pub base_path: Option<PathBuf>,
    pub relative_path: String,
    pub is_directory: bool,
    // pub contents: Vec<HeterogeneousContentArray>,
}

#[derive(Debug, Serialize, FromRow, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, rename_all = "camelCase")]
pub struct DirectorySource {
    #[ts(type = "number")]
    pub id: i64,

    #[sqlx(try_from = "String")]
    pub path: PathBuf,

    pub label: Option<String>,
    #[ts(as = "Vec<String>")]
    pub include_patterns: Json<Vec<String>>,
    #[ts(as = "Vec<String>")]
    pub exclude_patterns: Option<Json<Vec<String>>>,

    pub created_at: DateTime<Utc>,
    pub modified_at: Option<DateTime<Utc>>,
}

impl DirectorySource {
    pub fn get_file_list(&self) -> Vec<File> {
        // Glob all the files in this directory
        let mut result: Vec<File> = vec![];
        match glob(&self.path.join("**/*.md").to_string_lossy().to_string()) {
            Ok(paths) => {
                for entry in paths {
                    match entry {
                        Ok(file) => match file.strip_prefix(&self.path) {
                            Ok(relative_path) => {
                                if relative_path.to_str().unwrap() != "" {
                                    result.push(File {
                                        base_path: None,
                                        relative_path: relative_path.to_string_lossy().to_string(),
                                        is_directory: file.is_dir(),
                                        // contents: vec![],
                                    })
                                }
                            }
                            Err(_) => {}
                        },
                        Err(_) => {}
                    }
                }
            }
            Err(_) => {}
        }
        result
    }
}

#[derive(Debug, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, rename_all = "camelCase")]
pub struct DirectorySourceCreateUpdate {
    pub path: Option<String>,
    pub label: Option<String>,
    pub include_patterns: Option<Vec<String>>,
    pub exclude_patterns: Option<Vec<String>>,
}
