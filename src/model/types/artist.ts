/* eslint-disable semi */
/* eslint-disable no-unused-vars */

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
