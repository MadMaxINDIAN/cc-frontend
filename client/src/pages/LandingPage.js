import { useState, useEffect } from 'react';
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
import NavbarOnlyLayout from '../layouts/NavbarOnlyLayout';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
import POSTS from '../_mocks_/blog';

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* <NavbarOnlyLayout /> */}
    <Container>
    <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container></div>
  );
}
