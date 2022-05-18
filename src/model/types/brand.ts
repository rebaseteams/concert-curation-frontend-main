/* eslint-disable camelcase */
export type Brand = {
    brandName : string;
    brandId : string;
}

type NewType = Array<{
  demographicName: string;
  fields: Array<{
    name: string;
    value: number;
  }>;
}>;

export type NewBrandResponse = {
  id: string;
  name: string;
  logo: string;
  website: string;
  contact: string;
  demographics: NewType,
  media_handles: Array<
    {
      handleName: string,
      logo: string,
      url: string,
    }
  >,
  brand_affinity: {
    xAxisData: Array<string>;
    yAxisData: Array<{
      name: string;
      data: Array<{ xAxis: string, yAxis: number }>;
    }>;
  },
  latest_youtube_release: Array<{
  tumbnail: string,
  title: string,
  channelName: string,
  views: number,
  url: string,
  subscribers: number,
  }>,
  youtube_insights: {
    channel: {
      id: string;
      subscribersCount: number;
      viewsCount: number;
      videosCount: number;
      avgViewsCount: number;
      avgLikesCount: number;
      engagementRatio: number;
    },
    videos: Array<{
      playlistId: string;
      songCount: number;
      viewsCount: number;
      likesCount: number;
      dislikeCount: number;
      commentsCount: number;
    }>
  }
}
