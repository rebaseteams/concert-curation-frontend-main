type LatestRelease = {
  tumbnail: string,
  title: string,
  channelName: string,
  views: number,
  subscribers: number,
}
const latestRelease: Array<LatestRelease> = [
  {
    tumbnail: 'https://www.designyoutube.com/img/michael-jackson.jpg',
    title: 'Youtube video 1',
    channelName: 'Michael Jackson Fans',
    views: Math.floor(Math.random() * 20000),
    subscribers: Math.floor(Math.random() * 100000),
  },
  {
    tumbnail: 'https://i.ytimg.com/vi/pAyKJAtDNCw/maxresdefault.jpg',
    title: 'Youtube video 2',
    channelName: 'Michael Jackson Fans',
    views: Math.floor(Math.random() * 20000),
    subscribers: Math.floor(Math.random() * 100000),
  },
  {
    tumbnail: 'https://i.ytimg.com/vi/rDKjb2VhLqg/maxresdefault.jpg',
    title: 'Youtube video 3',
    channelName: 'Michael Jackson Fans',
    views: Math.floor(Math.random() * 20000),
    subscribers: Math.floor(Math.random() * 100000),
  },
  {
    tumbnail: 'https://i.ytimg.com/vi/qw0D_KN2KN8/maxresdefault.jpg',
    title: 'Youtube video 1',
    channelName: 'Michael Jackson Fans',
    views: Math.floor(Math.random() * 20000),
    subscribers: Math.floor(Math.random() * 100000),
  },
];

export default latestRelease;
