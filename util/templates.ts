const opener = "<?";
const closer = "?>";

export function parseTemplate<K extends string = never>(
  templateStr: string,
): (args: { [key in K]: string }) => string {
  const template: string[] = [];
  const keys: string[] = [];
  let last = 0;
  let opened: number = templateStr.indexOf(opener);
  let closed: number = opened !== -1 ? templateStr.indexOf(closer, opened) : -1;
  if (opened === -1 || closed === -1) return (_) => templateStr;
  while (opened !== -1 && closed !== -1) {
    template.push(templateStr.substring(last, opened));
    keys.push(templateStr.substring(opened + opener.length, closed));
    last = closed + closer.length;
    opened = templateStr.indexOf(opener, opened + opener.length);
    closed = opened !== -1 ? templateStr.indexOf(closer, opened) : closed;
  }
  template.push(templateStr.substring(closed + closer.length));
  return (args) => {
    let str = template[0];
    for (let i = 0; i < keys.length; i++) {
      // deno-lint-ignore no-explicit-any
      str += (args as any)[keys[i]];
      str += template[i + 1];
    }
    return str;
  };
}

export async function parseTemplateFromFile<
  K extends string = never,
>(path: string): Promise<(args: { [key in K]: string }) => string> {
  return parseTemplate(await Deno.readTextFile(path));
}
