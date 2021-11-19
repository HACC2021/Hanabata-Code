import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
// import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const switchImage = {
      duration: 2000,
      transitionDuration: 1000,
    };
    const fadeImages = [
      {
        url: 'images/kokohead.png',
        caption: 'What can you do on HIT?',
        caption2:
          'Get detailed information on each hiking trails pinned on the map such as difficulty or operating hours.',
        caption3:
          'See who wants to join your events/meetings and see if they are approved by the admin. ',
        caption4:
          'Share your experiences on hiking trails where you have visited with other people using our app.',
      },
      {
        url: 'images/kuliouou.jpeg',
        caption: 'Hiking Trail Etiquette 101',
        caption2: 'Know your right of way.',
        caption3: 'Do not disturb wildlife.',
        caption4: 'Be mindful of trail conditions and your surroundings.',
      },
      {
        url: 'images/diamond_head.png',
        caption: 'Credits',
        caption2:
          'HIT was designed as part of Hawaii Annual Code Challenge(HACC).',
        caption3:
          'HIT was developed using React Native, an open-source UI software framework created by Meta Platforms, inc.',
        caption4:
          'HIT was coded by Yong Kim, Keith Okuna, Yeji Han, Cheolhoon Choi, Kai Hwang.',
      },
    ];
    return (
      <section className="landing-section-1">
        <Grid columns={1}>
          <Grid.Column>
            <div className="slide-container">
              <Fade {...switchImage}>
                {fadeImages.map((fadeImage, index) => (
                  <div className="each-fade" key={index}>
                    <div className="image-container">
                      <Image
                        size="large"
                        verticalAlign="middle"
                        circular
                        src={fadeImage.url}
                      />
                    </div>
                    <br />
                    <h1 style={{ color: '#FFFFFF', fontSize: '35px' }}>
                      {fadeImage.caption}
                    </h1>
                    <h2 style={{ color: '#FFFFFF' }}>{fadeImage.caption2}</h2>
                    <h2 style={{ color: '#FFFFFF' }}>{fadeImage.caption3}</h2>
                    <h2 style={{ color: '#FFFFFF' }}>{fadeImage.caption4}</h2>
                  </div>
                ))}
              </Fade>
            </div>
          </Grid.Column>
          <Grid.Column>
            <Grid
              verticalAlign="middle"
              textAlign="center"
              columns={1}
              id="landing-page"
            >
              {Meteor.userId() === null && (
                <Grid.Column>
                  <Header style={{ color: 'rgb(44, 62, 80)' }} as="h1">
                    Sign up today & enjoy!
                  </Header>
                </Grid.Column>
              )}
            </Grid>
          </Grid.Column>
        </Grid>
      </section>
    );
  }
}

export default Landing;
