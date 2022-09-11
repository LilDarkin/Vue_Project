<script setup>
    import Image from '../assets/images/about.jpg'
    </script>
      
    <template>
        <v-parallax :src="Image">
            <v-container class="mt-10">
                <v-row justify="center">
                    <v-card width="50%">
                        <v-img height="200"
                            src="https://miro.medium.com/max/620/1*SGai7lOKRn9YhM2p-8SChQ.jpeg"
                            cover class="text-white">
                        </v-img>
    
                        <v-card-text>
                            <div class="font-weight-bold ml-1 mb-2">
                                Features & About
                            </div>
    
                            <v-timeline density="compact" truncate-line="none">
                                <v-timeline-item v-for="content in contents" :dot-color="content.color" :icon="content.icon"
                                    size="large">
                                    <div class="mb-4">
                                        <div class="font-weight-normal">
                                            <strong>{{ content.title }}</strong>
                                        </div>
                                        <div>{{ content.message }}</div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-container>
        </v-parallax>
    </template>
    
    <script>
        export default {
          data: () => ({
            contents: [
              {
                title: 'Introduction',
                message: `This website is a compilation of multiple activities`,
                color: 'red',
                icon: 'mdi-information',
              },
              {
                title: 'Responsive',
                message: "It creates dynamic changes to the appearance of a website, depending on the screen size and orientation of the device being used to view it.",
                color: 'deep-purple lighten-1',
                icon: 'mdi-responsive'
              },
              {
                title: 'User-Friendly',
                message: 'Making it easy for visitors to find the information they need quickly and easily on any device.',
                color: 'green',
                icon: 'mdi-account-heart',
              },
            ],
          }),
        }
        </script>