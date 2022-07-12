/* eslint-disable semi */
/* eslint-disable no-unused-vars */

export type ArtistNew = {
  id: string,
  name: string,
  image: string,
  gender: string,
  country: string,
  coverImage: string,
  bio: string,
  associatedBrands: Array<string>
  venues: Array<string>
  popuarity: number,
  audience: Array<
    {
      demographicName: string,
      fields: Array<
      {
        name: string,
        value: number,
      }>,
    }
  >,
  mediaHandles: Array<
    {
      handleName: string,
      logo: string,
      url: string,
      followers: number,
    }
  >,
  brandAffinity: {
    xAxisData: Array<string>;
    yAxisData: Array<{
      name: string;
      data: Array<{ xAxis: string, yAxis: number }>;
    }>;
  },
  popularityOverTime: {
    xAxisData: Array<string>;
    yAxisData: Array<{
      name: string;
      data: Array<{ xAxis: string, yAxis: number }>;
    }>;
  },
  latestYoutubeRelease: Array<{
    tumbnail: string,
    title: string,
    channelName: string,
    views: number,
    url: string,
    subscribers: number,
  }>,
  youtubeInsights: {
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
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  misc: any
}

export type Artist = {
        artistName: string,
        contryOrigin: string,
        artistId: string,
        artistImage: string,
        coverImage: string,
        artistBio: string,
        matchPercentage: number,
        socialMediaAnalytics: {
          youtube: {
            channel: string,
            subscribers: number,
            avgLikes: number,
            engegmentRatio: number,
            avgView: number,
            audience: {
              age: Array<{
                  ageGroup: string,
                  matchPercentage: number
                }>,
              gender: {
                male: number,
                female: number
              },
              genre: Array<{
                  genreName: string,
                  matchPercentage: number
                }>
            }
          },
          spotify: {
            channel: string,
            subscribers: number,
            avgLikes: number,
            engegmentRatio: number,
            avgView: number,
            audience: {
              age: Array<
                {
                  ageGroup: string,
                  matchPercentage: number
                }
              >,
              gender: {
                male: number,
                female: number
              },
              genre: Array<
                {
                  genreName: string,
                  matchPercentage: number
                }
              >,
            }
          },
          twitter: {
            channel: string,
            followers: number,
            avgLikes: number,
            totalTweets: number,
            avgView: number,
            audience: {
              age: Array<
                {
                  ageGroup: string,
                  matchPercentage: number
                }
              >,
              gender: {
                male: number,
                female: number
              },
              genre: Array<
                {
                  genreName: string,
                  matchPercentage: number
                }
              >,
            }
          }
        },
        manager: {
          name: string,
          id: string,
          contactInfo: {
            mobileNo: Array<string>,
            email: Array<string>,
          }
        },
        venues: Array<{
            id: string,
            name: string,
            address: {
              pincode: number,
              country: string,
              city: string,
              geoLocation: {
                lat: number,
                long: number
              }
            },
            venueCapacity: number,
            matchPercentage: number
          }>,
        age: Array<{
            ageGroup: string,
            matchPercentage: number
          }>,
        gender: {
          male: number,
          female: number
        },
        genre: Array<{
            genreName: string,
            matchPercentage: number
          }>,
        associatedBrands: Array<{
            id: string,
            name: string,
            contact: string,
            website: string,
            logoUrl: string
          }>
}
