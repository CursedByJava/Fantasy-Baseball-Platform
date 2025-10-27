import adapter from '@sveltejs/adapter-vercel';

const config = {
  kit: {
    adapter: adapter({
        runtime: 'nodejs20.x',
        split: true,
        regions: ['iad1'],
    })
  }
};

export default config;
