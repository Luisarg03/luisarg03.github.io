# blog Specification

## Purpose

Provide a blog on the site: authored MDX posts published as a listing page, individual post pages, and an RSS feed, consistent with the site's existing content architecture.

## Requirements

### Requirement: Blog content collection
The system SHALL provide a `blog` content collection of MDX posts in `src/content/blog/`, each with title, description, pubDate, and optional tags and draft flag. Posts with `draft: true` SHALL NOT appear in the listing, post pages, or RSS feed.

#### Scenario: Post with valid frontmatter
- **WHEN** a post exists with title, description, and pubDate in frontmatter
- **THEN** it is included in the blog collection

#### Scenario: Draft post is excluded
- **WHEN** a post has `draft: true`
- **THEN** it does not appear in the listing, is not reachable as a post page, and is absent from the RSS feed

### Requirement: Blog listing page
The system SHALL render `/blog` listing published posts sorted by pubDate descending, each showing title, description, date, and tags, linking to its post page.

#### Scenario: Listing shows published posts
- **WHEN** a visitor opens `/blog`
- **THEN** published posts appear newest first with title, description, date, tags, and a link to each post

### Requirement: Blog post page
The system SHALL render `/blog/[slug]` for each published post, showing the post title, date, tags, and the post content styled with the site's prose styles.

#### Scenario: Post renders with prose styling
- **WHEN** a visitor opens a post page
- **THEN** the content renders with the site's prose styling and the header shows title, date, and tags

### Requirement: RSS feed
The system SHALL expose an RSS feed at `/rss.xml` containing all published posts with title, description, pubDate, and absolute link to each post.

#### Scenario: Feed lists published posts
- **WHEN** a feed reader fetches `/rss.xml`
- **THEN** it receives valid RSS with all published posts and absolute URLs
