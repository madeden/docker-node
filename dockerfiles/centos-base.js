var funcs = require('./funcs.js')

module.exports = function (dist, release) {
  var contents = funcs.replace(header, {dist: dist, release: release}) + '\n\n'
  contents += funcs.replace(pkgs, {pkgs: funcs.generatePkgStr(commonPkgs)}) + '\n\n'
  if (release === '5') {
    contents += epel + '\n\n'
    contents += python + '\n\n'
  }
  return contents
}

var header = 'FROM {{DIST}}:{{RELEASE}}\n' +
  'MAINTAINER William Blankenship <wblankenship@nodesource.com>'

var pkgs = 'RUN yum install -y \\\n' +
  '{{PKGS}}' +
  ' && yum clean all'

var epel = 'RUN rpm -ivh http://dl.fedoraproject.org/pub/epel/5/x86_64/epel-release-5-4.noarch.rpm \\\n' +
  ' && yum install -y python26 git\\\n' +
  ' && yum clean all'

var python = 'ENV PYTHON python2.6'

var commonPkgs = [ 'automake',
  'libicu',
  'curl',
  'gcc',
  'gcc-c++',
  'git', // will fail if no epel, thats fine
  'kernel-devel',
  'make',
  'perl',
  'which' ]
