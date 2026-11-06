import * as api from '@lp-labs/text-template-renderer';
import { renderTemplate } from '@lp-labs/text-template-renderer';
const output = renderTemplate('Hello {{ user.name }}', { user: { name: 'Ari' } });
if (output !== 'Hello Ari') throw new Error('Template failed');
// @ts-expect-error invalid argument must be rejected by declarations
api.renderTemplate('{{missing}}', 4);
