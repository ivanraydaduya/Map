import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ImageZoom, {IOnClick} from 'react-native-image-pan-zoom';
import Modal from 'react-native-modal';

import {useDispatch, useSelector} from 'react-redux';
import {fetchCompaniesAction} from '../store/company/actions';
import {companySelector} from '../store/company/selector';

import FloorPlan from '../assets/floorplan.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const dummyData = [
//   {
//     coordinates: [140.33, 98.87, 160.31, 78.96], // top - right - bottom - left
//     logo: 'data:image/png;base64,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',
//     name: 'Google',
//     type: 'Business',
//     location: 'California, United States',
//     standNumber: 'A22',
//   },
//   {
//     coordinates: [87.54, 58.75, 107.28, 48.88],  // top - right - bottom - left
//     logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAXVBMVEX///8dofIAnfIAm/EAmfEVn/IAl/Hg8P202/rx+f75/f/T6fzD4vuf0fiFxffq9f5MsPQppPJru/XZ7fxXtPWNyfen1fnL5vt3wPY+qvQAlPFkuPWZzvg9rPN2vPZv+CZ4AAAC8UlEQVRoge2Z6ZKqMBCFoTut7CHsDuD7P+YFRmcchQQatOpW5fupJIeT7nQWHMdisVgsFovFYrFYLP8/Z69s0yKLI/+DooGXEgIRAYJqwse/ZPQ+2egC5P4AkMn7P34MLN0sWPFQgg+qk7Jbj78Heakw5cjWX+2Kd0P3BfT8ukwRXFFzdDPChCM7WB7iPeo3HFlnaCoMLWMxJ3uDLmvi9EIojK+cz7q9m1ajrNw81N7UKRaaly5II1sMol5Bcrn5PCV8t7+cl54INXap9RIFgOFS40USuPXgegtPNKAZZndMLVxqqqH86RWb2fLnX3SyI6LaLuvEv6OIaq7u5JrofjfrGLJO9Bg9zF6jHOmyeQA4bodhPP3pBJtnZc+gy10TnsIHmP1NzkqbVm7OlHXi537ppLoH05XeL1s3mOkXxKWrb9ltiC9b9zGjH6UB+qaKQllrZd3FcmOmX5gpNGiDq/S6mwvkL2fXNEUXIcXdaoXDghDyhRXX7PUSSydPuX5ZW5yRBBD7a8bUhStXd5qexB1nXm0eCU/m3jW6rC3dBD+nRvjTN9HXXz09a083IXWbRQPA28LuNsw7oNwIFDfCpHZUySGluYYp2yM7LHXM+Sv2nj9rl2WZvSj8IIvTdstQ7pUdLRenrZ5xV1aNTLPfLzfaNR5fjeTUp70y7Cxe7O7Y4twpYHNKH2DXfCiYs3vIZVK2OaniI2QdubFYUn+I7OZiCQck1U34+YbqA6M8IdXq5MKdC8ITMa3zTCl/mzGLH6cojNo7l91ZAhlVrV6YdpwBdXj6KUXu9kujFeStfpzfIysT0A8yvCG2zjkh0+VNevgVv6xS48qPR+wwRq3p7YNzXTVKGKsGKv5p6En3+iVQCERDVEcIywOrRd6KdSVq7ipvF2ELxqUIsH1DrcgTpRtnQpUc7PWO72VqNsYEqLK3fh7z665Q040VTXzfXbVd+IFvckEeVV3TFmlaZEnn1eeDlzuLxWKxWCwWi8VisXyaf3jsH8eZomRXAAAAAElFTkSuQmCC',
//     name: 'Twitter',
//     type: 'Communication',
//     location: 'San Francisco, California, United States',
//     standNumber: 'B21',
//   },
//   {
//     coordinates: [87.54, 68.82, 107.28, 58.75],  // top - right - bottom - left
//     logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAApCAMAAAA4Y0Y/AAAAbFBMVEVIZ6r///9FZan5+vw1WqQ6XaZBYqg9X6cyWKMtVaLw8ffq7fTl6PLK0eNnfrYpU6FddrK/x95XcrCYpsuHmMORoMjX3OrQ1ubFzOG3wNrd4e2os9JRba2hrc+Bk8Gxu9d2irwcTJ4ORpxuhLlApouHAAADVklEQVRYhe2V2bKjOAyGwXsMwSwBwpKQdN7/HVu/WPp0T5LD1HTV3EQXgLGsz5IlOYo+8pGPfOQ/ivg3unuVv1fUZhx3GnPK7FNUpPgeLKKjjOP4tMegSb1M1R5s76W3b1Wcj+O9XEuKqduheCBXvH6nYer4f+HagmxV97Dr3P4iVx/JVr4zSf8e1x7ALbUlslFIV2Mt+y6sck7z5/Y1c0lPr+Exm9KyRMHSxiVj9plPZTelZKubuky4uk2bOlymabCRcI+uSfszHbuNhpa+rk7M3B9Vkx5P7LUxF0zVjm27jJY0XeY2rj1NU3f9J1hk8SqZ7vld0Mu7yDTrf7UkXtxb5vYtj1ryxp6WKZ+Ty+q8jI5q4YoRwycN5AvXFMsHrUicWrE+XPmFYjsrG/+SyZrbNpAiUsU2OquZ65pXhZIXXQInu05gwZBdAUgODKuyrKoOOIdHCAO9Ruamt0fHO3WYKrIbAjXpHP/qrEYTygK4Dlaap2kobEB0RuUQsnMQ9gHuHXuvlRDGlgjc3dqArSuOmxEBsb4hin0QxnBcsLFKCT6W6Q4u4PH4olSWOrJYVlNIHHPhAieiwD6aYRguZGTgyQPlUwUI3KEUjBxrH2eIwEbbH6SdIirVq2b5lXv6jXvggPw6w4WL+uUmVyFEF7LLyWAQAraIjYILb5PwAvuG6zaunCW+bNzqK5fTx4KLa21cuSksX1/1wYXLHgyabifm4mdGS4RBuhROkBjDdRSTCwohvKIYzrSLQLkoHX7dqO1gowWfL7SleX++XFGyDJwxSYA/iTgEk2lEzCitDzYTzO3ugctvVJJT/Y5QtVwCqQ4aSX7ifGYrxYtrc+3PCvrxfCcmzkh++7i/T/hqi2MaN0v9Stai0cBLWJXaXcJL+LHUb+AafB7plbu2EJ8y97HmUrS1EModcOd2RbGhvR7XmYpOqJTxNrX0KxyS1E8jbQvvJe4jkwPQR633vYrMWMAr2ZZCVRwKmU7CeO+nDMO2hBuqxrdsHrh6jOiwxBfUGF1CVmykBzI+PC8lq/V8YQkV5aMSNIai0HbMS4PToUeel8LRbUG6xqgxF2p2gqbKch2QqTEfZ2t6tgrj39/sf3Zwsf0Q4re5r4M/Zr6FfOQjH/nIfvkJaaIsEa/B1HwAAAAASUVORK5CYII=',
//     name: 'Meta',
//     type: 'Communication',
//     location: 'California, United States',
//     standNumber: 'B12',
//   },
// ];

const Home = () => {
  const dispatch = useDispatch();

  const {data} = useSelector(companySelector);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [company, setCompany] = useState({
    name: '',
    logo: '',
    type: '',
    location: '',
  });

  const fetchCompanies = useCallback(
    () => dispatch(fetchCompaniesAction()),
    [dispatch],
  );

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  /**
   * It takes in two numbers, x and y, and returns the first item in the data array that has
   * coordinates that match the x and y values
   * @param {number} x - number, y: number
   * @param {number} y - the y coordinate of the mouse
   * @returns The square that the user clicked on.
   */
  const findSquare = (x: number, y: number) => {
    return data.find(
      item =>
        y >= item.coordinates[0] &&
        y <= item.coordinates[2] &&
        x >= item.coordinates[3] &&
        x <= item.coordinates[1],
    );
  };

  /**
   * We're using the `findSquare` function to find the company data for the square that was clicked on.
   * If we find a company, we set the `company` state to that company and set the `isModalVisible`
   * state to true. If we don't find a company, we set the `isModalVisible` state to false
   * @param {IOnClick} e - IOnClick
   */
  const handleClick = (e: IOnClick) => {
    console.log(e);
    const companyData = findSquare(e.locationX, e.locationY);
    if (companyData) {
      setCompany(companyData);
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  };

  return (
    <SafeAreaView>
      <ImageZoom
        cropWidth={windowWidth}
        cropHeight={windowHeight}
        imageWidth={400}
        imageHeight={500}
        onClick={handleClick}>
        <Image source={FloorPlan} style={styles.floorPlanImage} />
      </ImageZoom>
      <Modal
        isVisible={isModalVisible}
        deviceWidth={windowWidth}
        deviceHeight={windowHeight}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={{uri: company.logo}} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.title}>{company.name}</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>
                {company.type} | {company.location}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floorPlanImage: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
  },
  modalContent: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: 'white',
    height: 200,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  logo: {
    height: 70,
    resizeMode: 'contain',
  },
  logoContainer: {
    marginVertical: 8,
  },
});

export default Home;
