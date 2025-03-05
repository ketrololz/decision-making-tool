export default {
  '*.ts': ['eslint --fix', 'prettier --write'],
  '!(*.ts)': 'prettier --write',
  '*.scss': 'stylelint --fix',
};
