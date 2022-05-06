class classname {
  constructor(...classes) {
    this.classes = classes
      .map((e) => (typeof e == 'string' ? e : e[0] ? e[1] : null))
      .filter((e) => e);
  }
  add(newClass) {
    this.classes.push(newClass);
  }
  toString() {
    return this.classes.join(' ');
  }
}

export default classname;
