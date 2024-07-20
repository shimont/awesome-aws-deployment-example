const API_URL = 'https://hacker-news.firebaseio.com/v0';
const TOP_STORIES_URL = `${API_URL}/topstories.json`;
const ITEM_URL = `${API_URL}/item/`;
const MAX_STORIES = 30;

class hn {
  stories: number[];

  constructor() {
    this.stories = [];
  }

  async getTopStories() {
    const topStories = await fetch(TOP_STORIES_URL);
    const topStoriesJson = await topStories.json();
    this.stories = topStoriesJson.slice(0, MAX_STORIES);
    return this.stories;
  }

  async getStory(storyId: number) {
    const story = await fetch(`${ITEM_URL}${storyId}.json`);
    return await story.json();
  }

  async getStories() {
    await this.getTopStories();
    return await Promise.all(this.stories.map(this.getStory));
  }

  async getJSONresponse(stories: any[]) {
    let res = []
    for (let [rank, story] of stories.entries()) {
      let storyX = {
        'rank': rank + 1,
        'score': story.score,
        'title': story.title,
        'url': story.url,
        'by': story.by,
        'comments': `https://news.ycombinator.com/item?id=${story.id}`
      }
      res.push(storyX)
    }
    return res
  }

  async getPLAINresponse(stories: any[]) {
    let res = ""
    for (let [rank, story] of stories.entries()) {
      res += `#${rank + 1} ^${story.score} -> <a href="${story.url}">${story.title}</a>[<a href="https://news.ycombinator.com/item?id=${story.id}">comment</a>]<br>`
    }
    return res
  }
}

export default hn;