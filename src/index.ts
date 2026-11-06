function safeKey(k: string): boolean {
  return k !== '__proto__' && k !== 'prototype' && k !== 'constructor';
}
export function renderTemplate(template: string, data: Readonly<Record<string, unknown>>): string {
  if (
    typeof template !== 'string' ||
    template.length > 1000000 ||
    !data ||
    typeof data !== 'object'
  )
    throw new TypeError('Expected bounded template and record');
  return template.replace(
    /\{\{\s*([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\s*\}\}/g,
    (_m, path: string) => {
      let value: unknown = data;
      for (const key of path.split('.')) {
        if (
          !safeKey(key) ||
          value === null ||
          typeof value !== 'object' ||
          !Object.hasOwn(value, key)
        )
          throw new TypeError('Missing or unsafe template field: ' + path);
        value = (value as Record<string, unknown>)[key];
      }
      if (value === null) return 'null';
      if (['string', 'number', 'boolean'].includes(typeof value)) return String(value);
      throw new TypeError('Template value must be scalar');
    },
  );
}
