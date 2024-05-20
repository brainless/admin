use super::content::{Content, ContentSpec, ContentType};
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use ts_rs::TS;

pub type HeterogenousContent = (ContentType, HashSet<ContentSpec>, Content);

#[derive(Deserialize, Serialize, TS)]
#[ts(
    export,
    rename = "HeterogeneousContentArray",
    export_to = "../src/api_types/"
)]
pub struct HeterogeneousContentArray {
    pub contents: Vec<HeterogenousContent>,
}

#[derive(Deserialize, Serialize, TS)]
#[ts(
    export,
    rename = "HomogeneousContentArray",
    export_to = "../src/api_types/"
)]
pub struct HomogeneousContentArray {
    pub content_type: ContentType,
    pub content_type_spec: HashSet<ContentSpec>,
    pub contents: Vec<Content>,
}
