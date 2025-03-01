function skillsMember() {
  return {
    skills: ['html', 'css', 'js'],
    showSkills() {
      this.skills.forEach(skill => {
        console.log(`${this.name} knows ${skill}`);
      });
    }
  };
}