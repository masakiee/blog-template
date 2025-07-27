---
title: <%= title %>
description: <%= description %>
tags:<%= tags.length === 0 ? " []" : "" %>
<%_ tags.forEach(function(tag, index) { -%>
  - <%= tag %>
<%_ }) -%>
thumbnail_path: <%= thumbnail_path %>
thumbnail_alt: <%= thumbnail_alt %>
created_at: <%= created_at %>
updated_at: <%= updated_at ? updated_at : "null" %>
draft: true
---
